import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from 'draftjs-to-html';
// import { convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

export default function NewsEditor(props) {
    const [editorState,setEditorState]= useState('')
    //把html格式的内容转换到编辑区内
    useEffect(()=>{
        console.log(props.content)
        const html = props.content
        if(html===undefined)return 
        const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }
    },[props.content])
    
    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState)=>setEditorState(editorState)}
                onBlur={()=>{
                    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                    props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                }}
            />
        </div>
    )
}
