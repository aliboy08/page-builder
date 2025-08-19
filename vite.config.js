import mkcert from 'vite-plugin-mkcert'

export default {
	server: {
        https: true,
        cors: true,
    },
	plugins: [
		mkcert(),
	],
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			api: 'modern-compiler',
	// 		},
	// 	},
	// },
	resolve: {
		alias: {
			images: '/assets/images',
			css: '/src/css',
			js: '/src/js',
            lib: '/src/lib',
            components: '/src/components',
			src: '/src',
		},
	},
}
