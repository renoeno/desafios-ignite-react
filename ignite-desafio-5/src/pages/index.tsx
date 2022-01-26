import { GetStaticProps } from 'next';
import Link from 'next/link';
import Header from '../components/Header';

import { AiOutlineCalendar } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './home.module.scss';
import { useState } from 'react';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  preview: boolean;
}

export default function Home({ postsPagination, preview }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);

  const loadMorePagesHandler = async () => {
    const newPosts = [...posts];
    const response = await fetch(postsPagination.next_page);
    const data = await response.json();

    newPosts.push(...data.results);

    setPosts(newPosts);

    console.log(newPosts);
  };

  return (
    <>
      <Header />
      <main className={styles.contentContainer}>
        <div className={styles.posts}>
          {posts.map(post => {
            return (
              <Link href={`/post/${post.uid}`} key={post.uid}>
                <a>
                  <strong>{post.data.title}</strong>
                  <p>{post.data.subtitle}</p>
                  <div className={styles.postInfo}>
                    <AiOutlineCalendar className={styles.icon} />
                    <time>
                      {format(
                        new Date(post.first_publication_date),
                        'dd MMM yyyy',
                        {
                          locale: ptBR,
                        }
                      )}
                    </time>

                    <span className={styles.author}>
                      <FiUser className={styles.icon} />
                      <span> {post.data.author}</span>
                    </span>
                  </div>
                </a>
              </Link>
            );
          })}
          {postsPagination.next_page && (
            <a className={styles.loadPosts} onClick={loadMorePagesHandler}>
              Carregar mais posts
            </a>
          )}
        </div>
        {preview && (
          <aside>
            <Link href="/api/exit-preview">
              <a>Sair do modo Preview</a>
            </Link>
          </aside>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({
  preview = false,
  previewData,
}) => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 3,
      ref: previewData?.ref ?? null,
    }
  );

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  // console.log(results);

  const next_page = postsResponse.next_page ? postsResponse.next_page : null;

  const postsPagination = {
    next_page,
    results,
  };

  return {
    props: {
      postsPagination,
      preview,
    },
  };
};
