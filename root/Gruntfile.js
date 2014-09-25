module.exports = function( grunt ) {

    // Project configuration
    grunt.initConfig( {
        pkg:    grunt.file.readJSON( 'package.json' ),

        // jshint
        jshint: {
            all: [
                'js/{%= file_name %}.js'
            ],
            options: {
                jshintrc: true
            }
        },

        // js Minify
        uglify: {
            all: {
                files: {
                    'js/{%= file_name %}.min.js': [
                        'js/{%= file_name %}.js'
                    ]
                },
                options: {
                    banner: '/**\n' +
                        ' * <%= pkg.title %> - v<%= pkg.version %>\n' +
                        ' *\n' +
                        ' * <%= pkg.homepage %>\n' +
                        ' *\n' +
                        ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %> (<%= pkg.author.url %>)\n' +
                        ' * Released under the GNU General Public License v2 or later\n' +
                        ' */\n',
                    mangle: {
                        except: [
                            'jQuery'
                        ]
                    },
                    report: 'gzip'
                }
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir:        '_sass',
                    cssDir:         'css',
                    outputStyle:    'expanded',
                    imagesDir:      'images',
                    relativeAssets: true,
                    sourcemap:      true
                }
            }
        },

        // csscomb
        csscomb: {
            dist: {
                files: {
                    'style.css': [
                        'css/{%= file_name %}.css'
                    ]
                }
            }
        },

        wpcss: {
            target: {
                options: {
                    commentSpacing: true
                },
                files: {
                    'style.css': ['style.css']
                }
            }
        },

        // cssmin
        cssmin: {
            options: {
                report: 'gzip'
            },
            compress: {
                files: {
                    'css/{%= file_name %}.min.css': ['css/{%= file_name %}.css']
                }
            }
        },

        // watch
        watch: {
            options: {
                livereload: true,
                nospawn: true
            },
            js: {
                files: ['js/*.js'],
                tasks: [ 'jshint' ]
            },
            compass: {
                files: ['_sass/*.scss'],
                tasks: ['compass', 'csscomb', 'wpcss']
            }
        },

        makepot: {
            target: {
                options: {
                    domainPath: '/languages',
                    mainFile: 'style.css',
                    potFilename: '{%= file_name %}.pot',
                    type: 'wp-theme',
                }
            }
        },

        replace: {
            package: {
                src: ['inc/manage_scripts_styles.php'],
                dest: 'inc/manage_scripts_styles.php',
                replacements: [{
                    from: '{%= file_name %}.js',
                    to: '{%= file_name %}.min.js'
                }, {
                    from: 'style.css',
                    to: 'css/{%= file_name %}.min.css'
                }]
            }
        },

        image: {
            dynamic: {
                files: [{
                expand: true,
                cwd: 'images/',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: 'images/'
                }]
            }
        }

    } );

    require('load-grunt-tasks')(grunt);

    // Default task.
    grunt.registerTask(
        'default',
        ['jshint', 'compass', 'csscomb', 'wpcss']
    );

    // i18n
    grunt.registerTask(
        'i18n',
        ['makepot']
    );

    // Package task.
    grunt.registerTask(
        'package',
        ['uglify', 'cssmin', 'replace']
    );

    grunt.util.linefeed = '\n';
};
