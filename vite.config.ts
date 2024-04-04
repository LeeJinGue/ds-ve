import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import libCss from "vite-plugin-libcss";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        tsconfigPaths(),
        vanillaExtractPlugin(),
        react(),
        dts({
            insertTypesEntry: true,
        }),
        libCss(),
    ],
    build: {
        lib: {
            // 진입점
            entry: resolve(__dirname, "src/components/index.ts"),
            // 라이브러리 이름
            name: "@gyu-fe/ds-ve",
            // 파일이름
            fileName: "index",
            // 모듈형태
            formats: ["es"],
        },
        // rollup에 전달될 추가 옵션 정의
        rollupOptions: {
            // 빌드 과정에서 외부로 처리될 패키지 명시
            external: ["react", "react-dom"],
            // 빌드 결과물의 출력 옵션을 설정
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
});
