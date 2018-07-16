coolie.config({
    // ģ��ģʽ����������Ϊ COMMONJS��
    // �����ģ��淶�� CMD������дΪ CMD
    mode: 'CJS',

    // ���ģ���׼·��������ڵ�ǰ�ļ�
    mainModulesDir: './app/',

    // node_modules Ŀ¼ָ������� mainModulesDir
    // nodeModulesDir: '/node_modules/',

    // �ֶ�ָ�� node ģ�������ļ�����ʱ������ȥ����ģ��� package.json
    // ������ǳ��϶�������ص� node ģ������·������һ�µ�
    // ����Ҫ�޸����ô���
    // nodeModuleMainPath: 'src/index.js',

    // �Ƿ�Ϊ����ģʽ������֮����޸�Ϊ false
    debug: true,

    // ȫ�ֱ���������ģ�鹹����Ԥ��������ж�ѹ��
    global: {}
}).use();