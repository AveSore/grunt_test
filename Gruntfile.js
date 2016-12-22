/**
 * Created by wangmengfei on 16-12-21.
 *动态数据标签和ejs模板类似 <%= %>
 */

module.exports = function(grunt) {
    grunt.initConfig({
        //读取package.json文件信息
        pkg:grunt.file.readJSON('package.json'),
        static:"build/static",
        jsUrl:"<%=static%>/js",
        cssUrl:"<%=static%>/css",

        jshint: {
            options: {
                /*jshintrc:'.jshint',*/
                //大括号包裹
                curly: true,
                //对于简单类型，使用===和!==，而不是==和!=
                eqeqeq: true,
                //对于首字母大写的函数（声明的类），强制使用new
                newcap: true,
                //禁用arguments.caller和arguments.callee
                noarg: true,
                //对于属性使用aaa.bbb而不是aaa['bbb']
                sub: true,
                //查找所有未定义变量
                undef: true,
                //查找类似与if(a = 0)这样的代码
                boss: true,
                //指定运行环境为node.js
                node: true
            },
            //具体任务配置
            files: {
                src: ['Gruntfile.js','dev/static/js/**/*.js']
            }
        },
        csslint:{
            options:{
                /*csslintrc:'.csslint',*/
                "adjoining-classes":false,
                "box-sizing":false,
                "box-model" : false,
                "compatible-vendor-prefixes": false,
                "floats":false,
                "font-sizes":false,
                "gradients":false,
                "important":false,
                "known-properties":false,
                "outline-none":false,
                "qualified-headings":false,
                "regex-selectors":false,
                "shorthand":false,
                "text-indent":false,
                "unique-headings":false,
                "universal-selector":false,
                "unqualified-attributes":false
            },
            files:['dev/static/css/**/*.css']
        },
        concat:{
            options:{
                //文件内容的分隔符
                separator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            css:{
                src: ['dev/static/css/*.common.css'],
                dest: 'build/static/css/common.css'
            },
            js:{
                src: ['dev/static/js/*.common.js'],
                dest: 'build/static/js/common.js'
            }
        },
        uglify:{
            options:{
                sourceMap: false,
                stripBanners: true,
                //压缩后的文件注释信息
                banner :'/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                footer:'\n/*!修改于<%= grunt.template.today("yyyy-mm-dd") %>  */'
            },
            combine: {
                files: {
                    'build/static/js/compress-<%= pkg.name %>-<%= pkg.version %>.min.js': ['dev/static/js/*.common.js'],
                    'build/static/js/compress.common.min.js': ['dev/static/js/*/*.common.js']
                }
            },
            compress:{
                options:{
                    report:"min",
                    sourceMap: false,
                    stripBanners: true,
                    //压缩后的文件注释信息
                    banner :'/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    footer:'\n/*!修改于<%= grunt.template.today("yyyy-mm-dd") %>  */'
                },
                files:[
                    {
                        expand:true,
                        cwd:'dev/static/js',
                        src:['*.js','!*.min.js','!*.common.js'],
                        dest:'build/static/js',
                        ext:'.min.js'
                    }
                ]
            },
            fileCompress:{
                options:{
                    sourceMap: false,
                    stripBanners: true,
                    //压缩后的文件注释信息
                    banner :'/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files:[
                    {
                        expand:true,
                        cwd:'dev/static/js',
                        src:['**/*.js','!**/*.min.js','!**/*.common.js'],
                        dest:'build/static/js/',
                        ext:'.min.js'
                    }
                ]
            }
        },
        cssmin: {
            combine: {
                files: {
                    'build/static/css/compress.min.css': ['dev/static/css/*.common.css'],
                    'build/static/css/compressByFile.min.css': ['dev/static/css/*/*.common.css'],
                    'build/static/css/compressAll.min.css': ['dev/static/css/**/*.common.css']
                }
            },
            compress: {
                options: {
                    report: 'gzip',
                    separator: '',
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    //美化代码
                    beautify: {
                        //中文ascii化，非常有用！防止中文乱码的神配置
                        ascii_only: true
                    },
                    keepSpecialComments: 0 /* 删除所有注释 */
                },
                files: [
                    {
                        expand: true,
                        //相对路径
                        cwd: 'dev/static/css/',
                        src:['*.css','!*.common.css'],
                        dest: 'build/static/css',
                        ext:'.min.css'
                    }
                ]
            },
            fileCompress:{
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    //美化代码
                    beautify: {
                        //中文ascii化，非常有用！防止中文乱码的神配置
                        ascii_only: true
                    },
                    keepSpecialComments: 0 /* 删除所有注释 */
                },
                files: [
                    {
                        expand: true,
                        //相对路径
                        cwd: 'dev/static/css',
                        src:['**/*.css','!**/*.common.css'],
                        dest: 'build/static/css/',
                        ext:'.min.css'
                    }
                ]
            }
        },
        imagemin: {
            compress: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'dev/static/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/static/img'
                }]
            }
        },
        htmlmin: {
            compress: {
                options: {
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    keepClosingSlash:true,
                    removeEmptyElements:true,
                    removeScriptTypeAttributes:true,
                    removeStyleLinkTypeAttributes:true
                },
                files: [{
                    expand: true,
                    cwd: 'dev/templates/view',
                    src: '**/*.html',
                    dest: 'build/template'
                }]
            }
        },
        uncss: {
            dist: {
                options: {
                    ignore: [/js-.+/, '.special-class'],
                    ignoreSheets: [/fonts.googleapis/],
                },
                files: {
                    'build/static/css/unused-removed.css': ['dev/templates/view/index.html', 'dev/templates/view/about/about.html']
                }
            }
        },
        sass:{
            dist:{
                options:{
                    sourceMap: false,
                    style: 'expanded'
                },
                files:[{
                    expand:true,
                    cwd:'dev/static/sass',
                    src:['*.scss','*.sass'],
                    dest:'dev/static/scss',
                    ext:'.css'
                }]
            }
        },
        less:{
            dist:{
                options:{
                    style: 'expanded'
                },
                files:[{
                    expand:true,
                    cwd:'dev/static/less',
                    src:['*.less'],
                    dest:'dev/static/lcss',
                    ext:'.css'
                }]
            }
        },
        //watch自动化
        watch:{
            build:{
                files:['dev/static/js/*.js','dev/static/css/*.css'],
                tasks:['jshint','csslint','concat','cssmin','uglify'],
                options:{spawn:false}
            },
            /* 监控文件变化并执行相应任务 */
            img: {
                files: ['img/*.{png,jpg,jpeg}'],
                options: {
                    livereload: true
                }
            },
            css: {
                options: {
                    event: ['changed', 'added'],
                    livereload: true
                },
                files: ['css/*.css']
            },
            js: {
                options: {
                    livereload: true
                },
                files: ['js/*.js']
            },
            html: {
                options: {
                    livereload: true
                },
                files: ['html/*.html']
            }
        }

        //注解：
        //cwd: '', 指向的目录是相对的,全称Change Working Directory更改工作目录
        //src: ['**'], 指向源文件，**是一个通配符，用来匹配Grunt任何文件
        //dest: 'images', 用来输出结果任务
        //expand: true expand参数为true来启用动态扩展，涉及到多个文件处理需要开启
    });
    // 加载任务插件
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-uncss');


    // 默认被执行的任务列表。
    grunt.registerTask('default',['uncss','htmlmin']);
};