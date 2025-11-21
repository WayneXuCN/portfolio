'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-[60vh] flex items-center justify-center py-20'>
      <div className='max-w-3xl mx-auto px-6 text-center'>
        <p className='text-xs uppercase tracking-[0.6em] text-red-500 font-semibold mb-6'>404</p>
        <h1 className='display-font text-5xl sm:text-6xl font-bold mb-6'>页面好像走丢了</h1>
        <p className='text-lg text-gray-600 dark:text-gray-400 mb-10'>
          链接或许已更新，但好消息是，灵感仍在。试试看以下操作：
        </p>
        <div className='flex flex-col sm:flex-row sm:justify-center gap-4 mb-12'>
          <Link
            href='/'
            className='px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold card-hover transition-colors'
          >
            返回首页
          </Link>
          <Link
            href='/contact'
            className='px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-full font-semibold card-hover hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-gray-100'
          >
            联系 Wenjie
          </Link>
        </div>
        <div className='grid sm:grid-cols-2 gap-6 text-left'>
          <article className='p-6 border border-gray-200 dark:border-gray-700 rounded-3xl card-hover bg-white dark:bg-gray-800'>
            <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100'>
              最近项目
            </h3>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              浏览
              <Link
                href='/about'
                className='underline ml-1 hover:text-black dark:hover:text-white'
                suppressHydrationWarning
              >
                关于页
              </Link>
              了解正在进行的实验与作品
            </p>
          </article>
          <article className='p-6 border border-gray-200 dark:border-gray-700 rounded-3xl card-hover bg-white dark:bg-gray-800'>
            <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100'>
              联系合作
            </h3>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              想和我聊聊？点此
              <a
                className='underline ml-1 hover:text-black dark:hover:text-white'
                href='mailto:wenjie.xu.cn@outlook.com'
                suppressHydrationWarning
              >
                发送邮件
              </a>
              ，我随时准备提供帮助
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
