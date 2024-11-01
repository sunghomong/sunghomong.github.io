/* 최신 자바스크립트를 구형 브라우저에서도 호환 가능하도록 변환 */
import babel from '@rollup/plugin-babel';
/* 코드 압축 및 난독화 */
import terser from '@rollup/plugin-terser';
/* 라이선스 정보 추가 */
import license from 'rollup-plugin-license';
/* 파일 경로 관리를 위한 Node.js 기본 모듈 */
import path from 'path';

/* 소스 파일이 위치한 경로 */
const JS_SRC = '_javascript';
/* 빌드된 파일이 저장될 경로 */
const JS_DIST = 'assets/js/dist';
/* 프로덕션 환경 여부 확인 */
const isProd = process.env.NODE_ENV === 'production';

/* 특정 파일을 빌드하기 위한 설정을 생성하는 함수 */
function build(filename) {
  return {
    input: [`${JS_SRC}/${filename}.js`], // 입력 파일 경로 설정
    output: {
      file: `${JS_DIST}/${filename}.min.js`, // 출력 파일 경로 설정
      format: 'iife',  // 즉시 실행 함수로 번들링 (브라우저에서 사용 가능)
      name: 'Chirpy', // 전역 네임스페이스 이름
      sourcemap: !isProd // 프로덕션 환경이 아닌 경우 소스 맵 생성
    },
    watch: {
      include: `${JS_SRC}/**` // 소스 파일 변경 감지 설정
    },
    plugins: [
      /* Babel 설정: 최신 자바스크립트를 브라우저 호환 코드로 변환 */
      babel({
        babelHelpers: 'bundled', // 필요한 Babel 헬퍼를 번들에 포함
        presets: ['@babel/env'], // 최신 문법 변환을 위한 프리셋
        plugins: ['@babel/plugin-proposal-class-properties'] // 클래스 프로퍼티 문법 지원
      }),
      /* License 설정: 빌드된 파일에 라이선스 정보 추가 */
      license({
        banner: {
          commentStyle: 'ignored', // 주석 스타일 무시하고 그대로 삽입
          content: { file: path.join(__dirname, JS_SRC, '_copyright') } // 라이선스 내용 파일 경로
        }
      }),
      /* Terser 설정: 프로덕션 환경일 때만 코드 압축 및 난독화 수행 */
      isProd && terser()
    ]
  };
}

/* 빌드할 파일들의 설정 배열을 내보내기 */
export default [
  build('commons'),
  build('home'),
  build('categories'),
  build('page'),
  build('post'),
  build('misc')
];
