import React from 'react';

const BlogForm = ({ addBlog, newTitle, newAuthor, newUrl }) => {
    return (
        <>
            <form onSubmit={addBlog}>
                <div>
                    title: <input {...newTitle} reset={null} />
                </div>
                <div>
                    author: <input {...newAuthor} reset={null} />
                </div>
                <div>
                    url: <input {...newUrl} reset={null} />
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </>
    );
};

export default BlogForm;