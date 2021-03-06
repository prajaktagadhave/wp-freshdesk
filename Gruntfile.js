module.exports = function(grunt) {
	grunt.initConfig({
		copy: {
			main: {
				options: {
					mode: true
				},
				src: [
				'**',
                '!*.zip',
                '!node_modules/**',
                '!build/**',
                '!css/sourcemap/**',
                '!.git/**',
                '!bin/**',
                '!.gitlab-ci.yml',
                '!bin/**',
                '!tests/**',
                '!phpunit.xml.dist',
                '!*.sh',
                '!*.map',
                '!Gruntfile.js',
                '!package.json',
                '!.gitignore',
                '!phpunit.xml',
                '!README.md',
                '!sass/**',
                '!codesniffer.ruleset.xml',
                '!vendor/**',
                '!composer.json',
                '!composer.lock',
                '!package-lock.json',
                '!phpcs.xml.dist',
				],
				dest: 'wp-freshdesk/'
			}
		},
		compress: {
			main: {
				options: {
					archive: 'wp-freshdesk.zip',
					mode: 'zip'
				},
				files: [
				{ 
					src: [
					'./wp-freshdesk/**'
					]

				}
				]
			}
		},
		clean: {
			main: ["wp-freshdesk"],
			zip: ["wp-freshdesk.zip"]
		},
		makepot: {
            target: {
                options: {
                    domainPath: '/',
                    mainFile: 'wp-freshdesk.php',
                    potFilename: 'languages/wp-freshdesk.pot',
                    exclude: [
						'admin/bsf-core',
					],
                    potHeaders: {
                        poedit: true,
                        'x-poedit-keywordslist': true
                    },
                    type: 'wp-plugin',
                    updateTimestamp: true
                }
            }
        },
        addtextdomain: {
            options: {
                textdomain: 'wp-freshdesk',
            },
            target: {
                files: {
                    src: ['*.php', '**/*.php', '!node_modules/**', '!php-tests/**', '!bin/**', '!admin/bsf-core/**']
                }
            }
        },
		postcss: {
			main: {
				options: {
					map: {
						inline: false, 
						annotation: 'css/sourcemap' //sourcemap for autoprefixr
					},
					processors: [
					require('autoprefixer')({
						browsers: [
						'Android >= 2.1',
						'Chrome >= 21',
						'Edge >= 12',
						'Explorer >= 7',
						'Firefox >= 17',
						'Opera >= 10',
						'Safari >= 6.0'
						]
				        }), // add vendor prefixes
					]
				},
				src: [
				'css/*.css'
				]
			}
		},
		wp_readme_to_markdown: {
			your_target: {
				files: {
					'README.md': 'readme.txt'
				}
			},
		},

	});

grunt.loadNpmTasks( 'grunt-wp-readme-to-markdown' );
grunt.loadNpmTasks( 'grunt-contrib-copy' );
grunt.loadNpmTasks( 'grunt-contrib-compress' );
grunt.loadNpmTasks( 'grunt-contrib-clean' );
grunt.loadNpmTasks( 'grunt-postcss' );
grunt.loadNpmTasks( 'grunt-wp-i18n' );
grunt.loadNpmTasks( 'grunt-wp-readme-to-markdown' );

grunt.registerTask( 'release', [ 'clean:zip', 'copy','compress','clean:main' ] );
grunt.registerTask( 'css', [ 'postcss' ] );
grunt.registerTask( 'readme', ['wp_readme_to_markdown']);

grunt.registerTask( 'i18n', ['addtextdomain','makepot'] );

grunt.registerTask('default', ['readme', 'css']);

grunt.util.linefeed = '\n';
};