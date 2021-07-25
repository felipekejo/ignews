import styles from './styles.module.scss'
import Image from 'next/image'
import logoImg from '../../../public/images/logo.svg'

import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../SignInButton'
import { useRouter } from 'next/router'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logoImg} alt="ig.news" />
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