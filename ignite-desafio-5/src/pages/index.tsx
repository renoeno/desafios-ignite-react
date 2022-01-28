import { useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

import { fadeInUpOp, stagger } from '../animations/Animations';

import styles from './home.module.scss';

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

const delay = (ms = 1500) => new Promise(r => setTimeout(r, ms));

export default function Home({ postsPagination, preview }: HomeProps) {
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);

  const loadMorePagesHandler = async () => {
    setIsLoading(true);
    const newPosts = [...posts];
    await delay();
    const response = await fetch(nextPage);
    const data = await response.json();
    if (data.next_page) {
      setNextPage(data.next_page);
    } else {
      setHasNextPage(false);
    }

    newPosts.push(...data.results);

    setPosts(newPosts);
    setIsLoading(false);

    console.log(newPosts);
  };

  return (
    <>
      <Header />
      <main className={styles.contentContainer}>
        <motion.div
          className={styles.posts}
          variants={stagger}
          exit={{ opacity: 0 }}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5 }}
        >
          {posts.map(post => {
            return (
              <motion.div
                key={post.uid}
                className={styles.post}
                variants={fadeInUpOp}
              >
                <Link href={`/post/${post.uid}`}>
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
              </motion.div>
            );
          })}
          {postsPagination.next_page && !isLoading && hasNextPage && (
            <motion.a
              whileHover={{ color: '#008080' }}
              variants={fadeInUpOp}
              className={styles.loadPosts}
              onClick={loadMorePagesHandler}
            >
              Carregar mais posts
            </motion.a>
          )}

          {postsPagination.next_page && isLoading && (
            <div className={styles.spinner}>
              <LoadingSpinner />
            </div>
          )}
        </motion.div>

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
