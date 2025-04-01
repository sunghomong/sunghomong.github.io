/* 최신 자바스크립트를 구형 브라우저에서도 호환 가능하도록 변환 */
import babel from '@rollup/plugin-babel';
/* 코드 압축 및 난독화 */
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import fs from 'fs';
import pkg from './package.json';

const SRC_DEFAULT = '_javascript';
const SRC_PWA = `${SRC_DEFAULT}/pwa`;
const DIST = 'assets/js/dist';

const banner = `/*!
 * ${pkg.name} v${pkg.version} | © ${pkg.since} ${pkg.author} | ${pkg.license} Licensed | ${pkg.homepage}
 */`;
const frontmatter = `---\npermalink: /:basename\n---\n`;
const isProd = process.env.BUILD === 'production';

let hasWatched = false;

function cleanup() {
  fs.rmSync(DIST, { recursive: true, force: true });
  console.log(`> Directory "${DIST}" has been cleaned.`);
}

function insertFrontmatter() {
  return {
    name: 'insert-frontmatter',
    generateBundle(_, bundle) {
      for (const chunkOrAsset of Object.values(bundle)) {
        if (chunkOrAsset.type === 'chunk') {
          chunkOrAsset.code = frontmatter + chunkOrAsset.code;
        }
      }
    }
  };
}

function build(
  filename,
  { src = SRC_DEFAULT, jekyll = false, outputName = null } = {}
) {
  const input = `${src}/${filename}.js`;
  const shouldWatch = hasWatched ? false : true;

  if (!hasWatched) {
    hasWatched = true;
  }

  return {
    input,
    output: {
      file: `${DIST}/${filename}.min.js`,
      format: 'iife',
      ...(outputName !== null && { name: outputName }),
      banner,
      sourcemap: !isProd && !jekyll
    },
    ...(shouldWatch && { watch: { include: `${SRC_DEFAULT}/**/*.js` } }),
    plugins: [
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/env'],
        plugins: [
          '@babel/plugin-transform-class-properties',
          '@babel/plugin-transform-private-methods'
        ]
      }),
      nodeResolve(),
      isProd && terser(),
      jekyll && insertFrontmatter()
    ]
  };
}

cleanup();

/* 빌드할 파일들의 설정 배열을 내보내기 */
export default [
  build('commons'),
  build('home'),
  build('categories'),
  build('page'),
  build('post'),
  build('misc'),
  build('theme', { src: `${SRC_DEFAULT}/modules`, outputName: 'Theme' }),
  build('app', { src: SRC_PWA, jekyll: true }),
  build('sw', { src: SRC_PWA, jekyll: true })
];
