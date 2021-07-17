import styles from './styles.module.scss'
import Image from 'next/image'

import { SignInButton } from '../SignInButton'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" alt="ig.news" height={31} width={110} />
        <nav>
          <a className={styles.active}>Home</a>
          <a >Post</a>

        </nav>
        <SignInButton />
      </div>
    </header>
  )
}