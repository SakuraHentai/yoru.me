import type { NextPage } from 'next'
import Link from 'next/link'
import MetaInfo from '../components/meta-info'

import styles from '../styles/home.module.scss'
import { Canvas } from '@react-three/fiber'
import { Center, OrbitControls, Text3D } from '@react-three/drei'

const BgCanvas = () => {
  return (
    <>
      <Canvas>
        <Center rotation={[-0.5, -0.25, 0]}>
          <Text3D
            curveSegments={32}
            bevelEnabled
            bevelSize={0.04}
            bevelThickness={0.1}
            height={0.5}
            lineHeight={0.5}
            letterSpacing={-0.06}
            size={1.5}
            font="/Fipps-Regular.ttf"
          >
            {`HELLO\nI'm Derek`}
            <meshNormalMaterial />
          </Text3D>
        </Center>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </>
  )
}
const Home: NextPage = () => {
  return (
    <>
      <MetaInfo />
      <div className={styles.home}>
        <BgCanvas />
        <header className={styles.header}>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href={'/blog'}>Blog</Link>
              </li>
              <li>
                <Link href={'https://github.com/sakurahentai'}>Github</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <section></section>
        </main>
      </div>
    </>
  )
}

export default Home
