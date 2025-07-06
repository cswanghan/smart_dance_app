'use client';

import React from 'react';

export default function FeedbackPage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">提供反馈</h1>
      <p className="text-lg text-gray-700 mb-4">
        感谢您参与我们的 Beta 公测！您的反馈对我们至关重要。
      </p>
      <p className="text-md text-gray-600 mb-8">
        请通过以下方式提交您的宝贵意见、建议或遇到的问题：
      </p>
      <div className="space-y-4">
        <a
          href="mailto:feedback@smartdance.com?subject=智能舞房Beta反馈"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          发送邮件反馈
        </a>
        <p className="text-gray-500">
          或访问我们的反馈表单 (待定链接)
        </p>
        {/* <a
          href="https://forms.example.com/feedback"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300"
        >
          填写在线反馈表单
        </a> */}
      </div>
      <p className="mt-12 text-gray-500 text-sm">
        我们非常重视您的每一个反馈，并会尽快处理。
      </p>
    </div>
  );
}
