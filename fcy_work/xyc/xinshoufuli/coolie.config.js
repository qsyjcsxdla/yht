/**
 * ======================================================
 * coolie-cli �����ļ� `coolie.config.js`
 * ʹ�� `coolie init -c` ���� `coolie.config.js` �ļ�ģ��
 * ��ǰ�����ļ����ڵ�Ŀ¼Ϊ�����ĸ�Ŀ¼
 *
 * @link http://coolie.ydr.me/guide/coolie.config.js/
 * @author ydr.me
 * @version 1.6.11
 * @create 2016-02-16 17:43:53
 * =======================================================
 */

'use strict';

module.exports = function (coolie) {
    // coolie ����
    coolie.config({
        // �Ƿ��ڹ���֮ǰ���Ŀ��Ŀ¼
        clean: true,

        // Ŀ������
        dest: {
            // Ŀ��Ŀ¼������ڵ�ǰ�ļ�
            dirname: "../../xinshoufuli/",
            // Ŀ�����
            host: '/xyc/xinshoufuliHtml/',
            // �汾�ų���
            versionLength: 32
        },

        // js ����
        js: {
            // ���ģ�飬����ڵ�ǰ�ļ�
            main: [
                // ֧�� glob �﷨
                "./js/app/**/*.js"
            ],
            // coolie-config.js ·��������ڵ�ǰ�ļ�
            'coolie-config.js': "./js/coolie-config.js",
            // js �ļ�����Ŀ¼������� dest.dirname
            dest: './static/js/',
            // �ֿ�����
            chunk: []
        },

        // html ����
        html: {
            // html �ļ�������ڵ�ǰ�ļ�
            src: [
                // ֧�� glob �﷨
                "./**/*.html"
            ],
            // �Ƿ�ѹ��
            minify: true
        },

        // css ����
        css: {
            // css �ļ�����Ŀ¼������� dest.dirname
            dest: './css/',
            // css ѹ������
            minify: {
                compatibility: 'ie7'
            }
        },

        // ��Դ
        resource: {
            // ��Դ����Ŀ¼������� dest.dirname
            dest: './res/',
            // �Ƿ�ѹ��
            minify: true
        },

        // ԭ�������ļ�������ڵ�ǰ�ļ�
        copy: [
            // ֧�� glob �﷨
            './favicon.ico',
            './robots.txt'
        ]
    });

    // ʹ�� coolie �м��
    // coolie.use(require('coolie-*'));

    // �Զ��� coolie �м��
    //coolie.use(function (options) {
    //    // do sth.
    //    return options;
    //});
};