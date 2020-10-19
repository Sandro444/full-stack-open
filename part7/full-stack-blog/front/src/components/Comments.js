import React from "react"

export const Comments = ({comments}) => {


    return (<div>
        <h1>comments</h1>
        {
            comments.length == 0? <p>no comments currently</p> : <ul>
                {comments.map(comment=>{
                    return <li key={comment._id}> {comment.content} </li>
                })}
            </ul>
        }
    </div>)
}