import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'react-emotion'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { PostPreview } from '../components/BlogArchive/PostPreview'
import { BlogArchiveLayout } from '../components/BlogArchive/BlogArchiveLayout'

const PostDate = styled.small`
  color: red;
  &:hover {
    color: blue;
  }
`

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMdx.edges')

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <BlogArchiveLayout>{
          ({getLayout}) => (
            <>
              {posts.map(({ node: post }, index) => {
                const title = get(post, 'frontmatter.title') || post.fields.slug

                return (
                  <PostPreview
                    excerpt={post.excerpt}
                    title={title}
                    slug={post.fields.slug}
                    emotion={getLayout(index)}
                  />
                )
              })}
            </>
          )
        }
        </BlogArchiveLayout>
        <Bio />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 12) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
