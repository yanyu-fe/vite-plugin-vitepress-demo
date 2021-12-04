import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import {cleandir} from "rollup-plugin-cleandir";
import typescript from "rollup-plugin-typescript2";
import { resolve } from 'path'

const r = (p) => resolve(__dirname, '../', p)
const pkg = require('../package.json')

export default defineConfig({
    input: [r('plugins/demoBlock/index.ts')],
    output: [
        {
            format: 'cjs',
            file:r('dist') + '/index.cjs.js'
        },
        {
            format: 'esm',
            file:r('dist') + '/index.esm.js'
        }
    ],
    external: [...Object.keys(pkg.dependencies), 'path', 'fs'],
    plugins: [
        cleandir(r('dist')),
        typescript({}),
        alias({}),
        commonjs(),
        nodeResolve(),
        esbuild({
            target: 'node12'
        }),
        json()
    ]
})
