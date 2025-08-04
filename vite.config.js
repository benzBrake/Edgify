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
          }
          // 对于其他资源（如图片），保持原文件名和扩展名
          return 'assets/[name].[ext]';
        }
      }
    },
    outDir: './dist',  // 输出到 dist 目录
    emptyOutDir: true,  // 清空输出目录
    assetsDir: 'assets',  // 资源文件夹
    cssMinify: true,  // 压缩 CSS
    sourcemap: true   // 生成源映射
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    open: false  // 不自动打开浏览器
  },
  publicDir: false,  // 禁用公共目录功能，防止图片直接复制到 dist 根目录
  // 防止图片被转换为 data URI
  assetsInclude: ['**/*.svg'],
  // 禁用 CSS 中的图片内联
  css: {
    preprocessorOptions: {
      scss: {
        // SCSS 预处理器选项
      }
    },
    // 禁用自动内联图片
    devSourcemap: false
  },
  // 自定义插件处理图片复制和路径修改
  plugins: [
    {
      name: 'image-handler',
      // 在构建完成后复制文件到根目录
      closeBundle() {
        const { copyFileSync, existsSync, mkdirSync } = require('fs');
        const { join } = require('path');
        
        // 确保 dist 目录存在
        if (!existsSync('dist')) return;
        
        // 复制生成的 CSS 文件到根目录
        if (existsSync('dist/userContent.css')) {
          copyFileSync('dist/userContent.css', 'userContent.css');
        }
        
        // 复制源映射文件到根目录
        if (existsSync('dist/userChrome.css.map')) {
          copyFileSync('dist/userChrome.css.map', 'userChrome.css.map');
        }
        if (existsSync('dist/userContent.css.map')) {
          copyFileSync('dist/userContent.css.map', 'userContent.css.map');
        }
        
        // 复制图片资源到根目录的 images 文件夹
        const copyRecursiveSync = (src, dest) => {
          const { readdirSync, statSync } = require('fs');
          const exists = existsSync(src);
          const stats = exists && statSync(src);
          const isDirectory = exists && stats.isDirectory();
          if (isDirectory) {
            if (!existsSync(dest)) {
              mkdirSync(dest, { recursive: true });
            }
            readdirSync(src).forEach(function(childItemName) {
              copyRecursiveSync(join(src, childItemName), join(dest, childItemName));
            });
          } else {
            copyFileSync(src, dest);
          }
        };
        
        // 直接从 src/images 复制到 dist/images 文件夹
        if (existsSync('src/images')) {
          // 创建 dist/images 文件夹
          if (!existsSync('dist/images')) {
            mkdirSync('dist/images', { recursive: true });
          }
          
          copyRecursiveSync('src/images', 'dist/images');
        }
      }
    }
  ]
});