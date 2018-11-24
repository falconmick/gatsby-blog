import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, navigate } from "gatsby"
import Img from "gatsby-image"

export const PostPreview = props => {
  const { slug, excerpt, title, emotion } = props;
  return (
    <StaticQuery
      query={graphql`
        query DefaultImageQuery {
            defaultImage: file(relativePath: {eq: "purple-space.jpg"}) {
                childImageSharp {
                    fluid(maxWidth: 1600) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
      `}
      render={data => console.log(JSON.stringify(data)) || (
        <div className={emotion} key={slug} onClick={ () => navigate(`/post/${slug}`)} role="link" tabIndex="0">
          <Img fluid={data.defaultImage.childImageSharp.fluid} />
          <div>
            <h3>{title}</h3>
            <p dangerouslySetInnerHTML={{ __html: excerpt }} />
          </div>
        </div>
      )}
    />
  )
};

PostPreview.propTypes = {
  excerpt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  emotion: PropTypes.string.isRequired,
}
