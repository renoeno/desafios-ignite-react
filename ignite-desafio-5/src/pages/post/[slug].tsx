import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import Prismic from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';

import { AiOutlineCalendar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { fadeInUpOp, fadeIn } from '../../animations/Animations';

import styles from './post.module.scss';
import Header from '../../components/Header';
import { useEffect } from 'react';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  preview: boolean;
  editedAt?: string;
  neighbourPosts: {
    lastPost?: {
      uid: string;
      title: string;
    };
    nextPost?: {
      uid: string;
      title: string;
    };
  };
}

export default function Post({
  post,
  preview,
  editedAt,
  neighbourPosts,
}: PostProps) {
  const router = useRouter();

  useEffect(() => {
    let script = document.createElement('script');
    let anchor = document.getElementById('inject-comments-for-uterances');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    script.setAttribute('repo', 'renoeno/ignite-desafio-5');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-dark');
    anchor.appendChild(script);
  }, []);

  const pubDate = format(new Date(post.first_publication_date), 'dd MMM yyyy', {
    locale: ptBR,
  });

  const editingDate = editedAt && {
    hour: format(new Date(editedAt), 'dd MMM yyyy', {
      locale: ptBR,
    }),
    minute: format(new Date(editedAt), 'H:m', {
      locale: ptBR,
    }),
  };
  return (
    <>
      <Header />
      {router.isFallback ? (
        <p>Carregando...</p>
      ) : (
        <motion.div
          exit={{ opacity: 0 }}
          initial="initial"
          animate="animate"
          transition={{ duration: 1 }}
          className={styles.contentContainer}
        >
          <motion.div variants={fadeIn} className={styles.imageContainer}>
            <img src={post.data.banner.url} alt="Post image" />
          </motion.div>

          <motion.div variants={fadeInUpOp} className={styles.post}>
            <div className={styles.postHeading}>
              <h1>{post.data.title}</h1>
              <div className={styles.postInfo}>
                <span className={styles.infoGroup}>
                  <AiOutlineCalendar className={styles.icon} />
                  <time>{pubDate}</time>
                </span>
                <span className={styles.infoGroup}>
                  <FiUser className={styles.icon} />
                  <span>{post.data.author}</span>
                </span>
                <span className={styles.infoGroup}>
                  <BiTimeFive className={styles.icon} />4 min
                </span>
              </div>
            </div>
            {editingDate && (
              <div className={styles.editedAt}>
                * editado em {editingDate.hour} às {editingDate.minute}
              </div>
            )}
            {post.data.content.length > 0 &&
              post.data.content.map(thisContent => {
                return (
                  <div className={styles.postContent} key={thisContent.heading}>
                    <h2>{thisContent.heading}</h2>
                    <span>
                      <p>
                        {thisContent.body.map(bodyText => {
                          return bodyText.text;
                        })}
                      </p>
                    </span>
                  </div>
                );
              })}
            <div className={styles.otherPosts}>
              <div>
                {neighbourPosts.lastPost && (
                  <Link href={`/post/${neighbourPosts.lastPost.uid}`}>
                    <a>
                      <div className={styles.lastPost}>
                        <span>{neighbourPosts.lastPost.title}</span>
                        <span>Post anterior</span>
                      </div>
                    </a>
                  </Link>
                )}
              </div>

              <div>
                {neighbourPosts.nextPost && (
                  <Link href={`/post/${neighbourPosts.nextPost.uid}`}>
                    <a>
                      <div className={styles.nextPost}>
                        <span>{neighbourPosts.nextPost.title}</span>
                        <span>Próximo post</span>
                      </div>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>

          <div id="inject-comments-for-uterances"></div>
          {preview && (
            <aside>
              <Link href="/api/exit-preview">
                <a>Sair do modo Preview</a>
              </Link>
            </aside>
          )}
        </motion.div>
      )}
    </>
  );
}

{
  /* <script src="https://utteranc.es/client.js"
        repo="renoeno/ignite-desafio-5"
        issue-term="pathname"
        theme="github-dark"
        crossorigin="anonymous"
        async>
</script> */
}

export async function getStaticPaths() {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    { fetch: ['publication.title', 'publication.content'], pageSize: 5 }
  );

  return {
    fallback: true,
    paths: postsResponse.results.map(post => ({
      params: {
        slug: post.uid,
      },
    })),
  };
}

export const getStaticProps: GetStaticProps<PostProps> = async ({
  params,
  preview = false,
  previewData,
}) => {
  const { slug } = params;

  try {
    const prismic = getPrismicClient();
    const response = await prismic.getByUID('posts', String(slug), {
      ref: previewData?.ref ?? null,
    });

    const post = {
      first_publication_date: response.first_publication_date,
      uid: response.uid,
      data: response.data,
    };

    const editedAt =
      response.first_publication_date !== response.last_publication_date
        ? response.last_publication_date
        : null;

    const postsResponse = await prismic.query(
      [Prismic.predicates.at('document.type', 'posts')],
      {
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100,
      }
    );

    const postIndex = postsResponse.results.findIndex(
      thisPost => thisPost.uid === post.uid
    );
    const neighbourPosts = {
      lastPost: postsResponse.results[postIndex - 1]
        ? {
            uid: postsResponse.results[postIndex - 1].uid,
            title: postsResponse.results[postIndex - 1].data.title,
          }
        : null,
      nextPost: postsResponse.results[postIndex + 1]
        ? {
            uid: postsResponse.results[postIndex + 1].uid,
            title: postsResponse.results[postIndex + 1].data.title,
          }
        : null,
    };

    return {
      props: {
        post,
        preview,
        editedAt,
        neighbourPosts,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
