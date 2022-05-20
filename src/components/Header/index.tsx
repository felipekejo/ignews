import styles from './styles.module.scss'
import Image from 'next/image'

import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../SignInButton'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" width={110} height={31} alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a >Post</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}