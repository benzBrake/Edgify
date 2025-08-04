import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        userChrome: resolve(__dirname, 'src/userChrome.scss'),
        userContent: resolve(__dirname, 'src/userContent.scss')
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            // 对于 SCSS 文件编译后的 CSS，保持原文件名
            return '[name].css';
          } else if (/\.(png|jpe?g|gif|svg|ico|webp|avif)$/i.test(assetInfo.name)) {
            return 'images/[name].[ext]'
          }
          return 'assets/[name].[ext]';
        }
      }
    },
    outDir: './dist',  // 输出到 dist 目录
    emptyOutDir: true,  // 清空输出目录
    assetsDir: 'assets',  // 资源文件夹
    cssMinify: false,  // 压缩 CSS
    sourcemap: false,   // 生成源映射
    assetsInlineLimit: 0 // 禁用资源内联，所有资源都将作为单独的文件
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    open: false  // 不自动打开浏览器
  },
  publicDir: false,  // 禁用公共目录功能
  plugins: [
    {
      name: 'post-build-copy',
      // 在构建完成后执行
      closeBundle() {
        const { copyFileSync, existsSync, readFileSync, writeFileSync } = require('fs');
        
        // 确保 dist 目录存在
        if (!existsSync('dist')) return;

        // 修复 userChrome.css 中的路径
        if (existsSync('dist/userChrome.css')) {
          const cssPath = 'dist/userChrome.css';
          let cssContent = readFileSync(cssPath, 'utf-8');
          cssContent = cssContent.replace(/url\("\/images\//g, 'url("images/');
          writeFileSync(cssPath, cssContent, 'utf-8');
        }
        
        // 修复 userContent.css 中的路径
        if (existsSync('dist/userContent.css')) {
          const cssPath = 'dist/userContent.css';
          let cssContent = readFileSync(cssPath, 'utf-8');
          cssContent = cssContent.replace(/url\("\/images\//g, 'url("images/');
          writeFileSync(cssPath, cssContent, 'utf-8');
        }

        // 复制生成的 CSS 文件到项目根目录
        if (existsSync('dist/userContent.css')) {
          copyFileSync('dist/userContent.css', 'userContent.css');
        }
        
        // 复制源映射文件到项目根目录
        if (existsSync('dist/userChrome.css.map')) {
          copyFileSync('dist/userChrome.css.map', 'userChrome.css.map');
        }
        if (existsSync('dist/userContent.css.map')) {
          copyFileSync('dist/userContent.css.map', 'userContent.css.map');
        }
      }
    }
  ]
});