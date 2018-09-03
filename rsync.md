## 使用rsync在windows电脑上实现文件同步
> 本文将在一台Linux服务器A上搭建rsync文件同步服务，然后在另一台windows电脑B上保持与A的单向同步

1. 服务端操作
 * 以centos为例，安装rsync: `yum -y install rsync`
 * 直接启动rsync: `rsync --daemon --config=/etc/rsyncd.conf`
 * 执行`ps -ef | grep rsync`可以看到服务已经成功启动
 * 安装rsync时默认生成了配置文件 `/etc/rsyncd.conf` , 下面讲解一下配置文件. 完整的配置如下:

    ~~~
      uid = root
      gid = root
      use chroot = yes
      max connections = 4
      pid file = /var/run/rsyncd.pid
      exclude = lost+found/
      transfer logging = yes
      timeout = 900
      ignore nonreadable = yes
      dont compress   = *.gz *.tgz *.zip *.z *.Z *.rpm *.deb *.bz2

      [test]
      path = /root/tmp/test01/
      ignore errors = yes --忽略一些无关的I/O错误
      read only = no --客户端可以上传
      write only = no --客户端可以下载
      hosts allow = 192.168.22.12 --允许连接的客户端主机ip
      hosts deny = * --黑名单，*表示任何主机
      list = yes
      auth users = web --认证此模块的用户名
      secrets file = /etc/web.passwd --指定存放“用户名：密码”格式的文件
      ~~~
      * `[test]`一行以上的内容，与默认的配置无异，我们采用默认的配置即可
      * 表示我们要启动一个提供同步的目录，分别命名为`test`的目录，路径为`/root/tmp/test01/`
      * 这里的`[test]`在文档中叫做 module name,我们可以理解为"别名"、"alias"的意思即可
      * read only = yes 表示客户端只能下载服务端的文件而不能上传(单向同步)，这应该是大部分业务的需求,如果有上传需要,设置read only = no 即可
      > 有一点需要提醒: `/etc/rsyncd.conf`配置修改后,并不需要重启服务即可生效
      * 如果想要关闭rsync服务,执行ps -ef | pgrep rsync | xargs kill 即可
      * rsync的默认端口是873, 如果服务器有防火墙限制,需要开放873端口 `iptables -I INPUT -p tcp --dport 873 -j ACCEPT`
2. 客户端的搭建
  > 这里使用的是windows的平台(因为没有其他平台),使用类Unix的更简单

  * 下载windows的客户端 [cwRsync](http://www.jswei.cn/cwRsyncForWin/cwRsync_4.0.5_Installer.zip)
  * 下载后根据步骤安装客户端
  * 测试一下命令(假设A的IP是192.168.1.100):
    `rsync -r --list-only root@192.168.1.100::test`
  * 该命令中的参数:

    ```
    -r 参数表示要递归同步目录下的目录.
    --list-only 参数表示只输出,不执行真正的文件传输.
    192.168.1.100 是服务器的IP，你可以替换成相应的域名.
    test 就是我们配置中指定的module name, 请记住, test前面是两个冒号.
    ```

3. 同步文件
  ```
  rsync -vzrtopg --progress root@192.168.1.100::test /test     #通test模块指定的/test目录下的文件拷贝到本客户端的/test目录下
  参数说明:
  v:显示详细信息
  z：传输过程中对数据进行压缩
  r：递归
  t：保留修改时间属性
  o：保留文件所有者属性
  p：保留文件权限属性
  g：保留文件所属组属性
  a：归档模式，主要保留文件属性，等同于-rlptgoD
  --progress：显示数据传输的进度信息
  --password-file=FILE：指定密码文件，将密码写入文件，实现非交互式数据同步，这个文件名也需要修改权限为600
  --delete：删除那些仅在目标路径中存在的文件（源路径中不存在），在脚本中的数据同步经常加上此参数
  --list-only：仅列出服务器模块列表，需要rsync服务器设置list=true
  ```
  * 一些示例

  ```
  1. rsync -t *.c 192.168.0.54:src/        #将本机当前目录下的以.c结尾的文件赋值到192.168.0.54的src目录下
  2. rsync -avz 192.168.0.54:src/bar /data/tmp     #从192.168.0.54主机上将src/bar目录以递归方式复制到本机/data/tmp目录
  3. rsync -avz 192.168.0.54:src/bar/ /data/tmp   #和例子2的区别是不在/data/tmp目录下创建bar目录
  4. rsync -avz /src/foo /dest    #将本机/src/foo目录复制到/dest目录
  5. rsync -avz tom@192.168.0.230::common /test3    #使用tom账户连接远程192.168.0.230主机的rsync进程，将common模块定义的path路径下载到本地test3目录
  6. rsync -avz 192.168.0.230::common /test3     #匿名下载192.168.0.230服务器的common模块至本地的/test3目录
  7. rsync --list-only tom@192.168.0.254::    #显示192.168.0.254服务器所有的模块名称，需要服务器端配置list=true才会显示
  ```
4. 远程shell连接使用daemon
  > 远程shell daemon的方式严格地说是"远程shell通信方式+使用rsync daemon的功能"。所以它的通信方式和远程shell是一样的，在客户端发起远程shell连接，在server端fork远程shell进程以启动rsync进程，但这个rsync进程是临时的rsync daemon，它只读取配置文件中client所请求的模块部分，且只读取模块部分中的path和身份认证相关内容，(也就是说不会将全局配置项和其它模块项加载到内存，该模块下的其他配置也不会生效)，当rsync操作完成，该rsync daemon就消逝并从内存中被清理。而且，远程shell daemon启动的临时daemon不会和已经在server端运行的rsync daemon冲突，它们可以并存。由于远程shell连接的最终目标是rsync模块，所以它只能使用rsync daemon语法。

  * 以下是语法格式：为了简洁，没有指定src还是dest，且以ssh这个远程shell为例
  ```
  rsync [options] --rsh=ssh auth_user@host::module
  rsync [options] --rsh="ssh -l ssh_user" auth_user@host::module
  rsync [options] -e "ssh -l ssh_user" auth_user@host::module
  rsync [options] -e "ssh -l ssh_user" rsync://auth_user@host/module
  ```
  * 涉及了两个用户ssh_user和auth_user，由于使用的是远程shell通信方式，所以client要和server端建立ssh连接，ssh_user就是ssh连接server的用户。auth_user则是模块中的身份认证用户。如果不指定"ssh_user"，则默认将使用auth_user，但很多时候auth_user都只是一个虚拟用户，这样就建立不了ssh连接导致失败，所以建议明确指定ssh_user和auth_user。
  * 举个例子就能说明上面的一切。以下是server端配置文件/etc/rsyncd.conf中的一个模块配置，稍后将从client端使用远程shell方式请求该模块。
  ```
  [tmpdir]
  path=/tmp
  auth users=lisi
  secrets file=/tmp/lisi_passwd
  ```
  * 当前server端是没有rsync daemon在运行的。
  ```
  [root@xuexi ~]# netstat -tnl
  Active Internet connections (only servers)
  Proto Recv-Q Send-Q Local Address           Foreign Address         State     
  tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN    
  tcp        0      0 127.0.0.1:25            0.0.0.0:*               LISTEN    
  tcp6       0      0 :::22                   :::*                    LISTEN    
  tcp6       0      0 ::1:25                  :::*                    LISTEN
  ```
  * 在客户端上使用以下命令：
  ```
  [root@xuexi ~]# rsync --list-only -e "ssh -l root" lisi@172.16.10.6::tmpdir
  root@172.16.10.6's password:
  Password:
  ```
  * 可以看到要求输入两次密码，第一次密码是root@XXX的密码，即建立ssh连接使用的密码，只有建立了ssh连接，才能在server上启动临时rsync daemon。第二次输入的密码Password是"auth users=lisi"对应的密码。

5. rsync 更多参数介绍：
  ```
  -v, --verbose 详细模式输出
  -q, --quiet 精简输出模式
  -c, --checksum 打开校验开关，强制对文件传输进行校验
  -a, --archive 归档模式，表示以递归方式传输文件，并保持所有文件属性，等于-rlptgoD
  -r, --recursive 对子目录以递归模式处理
  -R, --relative 使用相对路径信息
  -b, --backup 创建备份，也就是对于目的已经存在有同样的文件名时，将老的文件重新命名为~filename。可以使用--suffix选项来指定不同的备份文件前缀。
  --backup-dir 将备份文件(如~filename)存放在在目录下。
  -suffix=SUFFIX 定义备份文件前缀
  -u, --update 仅仅进行更新，也就是跳过所有已经存在于DST，并且文件时间晚于要备份的文件。(不覆盖更新的文件)
  -l, --links 保留软链结
  -L, --copy-links 想对待常规文件一样处理软链结
  --copy-unsafe-links 仅仅拷贝指向SRC路径目录树以外的链结
  --safe-links 忽略指向SRC路径目录树以外的链结
  -H, --hard-links 保留硬链结
  -p, --perms 保持文件权限
  -o, --owner 保持文件属主信息
  -g, --group 保持文件属组信息
  -D, --devices 保持设备文件信息
  -t, --times 保持文件时间信息
  -S, --sparse 对稀疏文件进行特殊处理以节省DST的空间
  -n, --dry-run现实哪些文件将被传输
  -W, --whole-file 拷贝文件，不进行增量检测
  -x, --one-file-system 不要跨越文件系统边界
  -B, --block-size=SIZE 检验算法使用的块尺寸，默认是700字节
  -e, --rsh=COMMAND 指定使用rsh、ssh方式进行数据同步
  --rsync-path=PATH 指定远程服务器上的rsync命令所在路径信息
  -C, --cvs-exclude 使用和CVS一样的方法自动忽略文件，用来排除那些不希望传输的文件
  --existing 仅仅更新那些已经存在于DST的文件，而不备份那些新创建的文件
  --delete 删除那些DST中SRC没有的文件
  --delete-excluded 同样删除接收端那些被该选项指定排除的文件
  --delete-after 传输结束以后再删除
  --ignore-errors 及时出现IO错误也进行删除
  --max-delete=NUM 最多删除NUM个文件
  --partial 保留那些因故没有完全传输的文件，以是加快随后的再次传输
  --force 强制删除目录，即使不为空
  --numeric-ids 不将数字的用户和组ID匹配为用户名和组名
  --timeout=TIME IP超时时间，单位为秒
  -I, --ignore-times 不跳过那些有同样的时间和长度的文件
  --size-only 当决定是否要备份文件时，仅仅察看文件大小而不考虑文件时间
  --modify-window=NUM 决定文件是否时间相同时使用的时间戳窗口，默认为0
  -T --temp-dir=DIR 在DIR中创建临时文件
  --compare-dest=DIR 同样比较DIR中的文件来决定是否需要备份
  -P 等同于 --partial
  --progress 显示备份过程
  -z, --compress 对备份的文件在传输时进行压缩处理
  --exclude=PATTERN 指定排除不需要传输的文件模式
  --include=PATTERN 指定不排除而需要传输的文件模式
  --exclude-from=FILE 排除FILE中指定模式的文件
  --include-from=FILE 不排除FILE指定模式匹配的文件
  --version 打印版本信息
  --address 绑定到特定的地址
  --config=FILE 指定其他的配置文件，不使用默认的rsyncd.conf文件
  --port=PORT 指定其他的rsync服务端口
  --blocking-io 对远程shell使用阻塞IO
  -stats 给出某些文件的传输状态
  --progress 在传输时现实传输过程
  --log-format=formAT 指定日志文件格式
  --password-file=FILE 从FILE中得到密码
  --bwlimit=KBPS 限制I/O带宽，KBytes per second
  -h, --help 显示帮助信息
  ```
6.  编写简单shell脚本，使客户端定期对rsync服务器(192.168.0.230)的数据进行备份
  ```
  #!/bin/bash
  export PATH=/bin:/usr/bin:/usr/local/bin
  SRC=common #模块名
  DEST=/data
  server=192.168.0.230
  user=tom
  passfile=/root/rsync.pass
  #if the DEST directory not found, then create one
  [ ! -d $DEST ] && mkdir $DEST
  [ ! -e $passfile ] && exit 2
  rsync -az --delete --password-file=$passfile ${user}@${server}::$SRC $DEST/$(data +%Y%m%d)   #加上日期
  ```
