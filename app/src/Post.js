import { useState } from "react";
import * as React from 'react';
import loader from './assets/loadergif.gif'
import { Body } from "./Body";

export const FeedPostDesign = ({posts,createPostFunction,walletaddress,connect,Loading}) =>{
    const [postText, setPostText] = useState('')
    const [hastagText, setHastagText] = useState('')
    const [limit, setLimit] = useState(10)

    async function submit(){ 
      if(postText && hastagText && posts.length)
      {
        await createPostFunction(postText,hastagText,posts.length)
        setHastagText('') 
        setPostText('') 
      }else{
        alert('Please enter all inputs')
      }
    }

    function increase(){
      setLimit(limit+10)
    }

    return (
      <div
       className="scrollStyle"
      >
        <div
          className="bodyStyle"
        >
          <div className="borderStyle">
            <h3> HOME </h3>
         { walletaddress && walletaddress!=='' ? <div>
              <div className="inputStyle">
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  rows={1}
                  placeholder="What's happening?..."
                  className="inputStyles"
                />
              </div>

              <div className="secondaryInputBoxStyles">
                <textarea
                  value={hastagText}
                  onChange={(e) => setHastagText(e.target.value)}
                  rows={1}
                  placeholder=" :) or :( "
                  className="hastagInputStyles"
                />
                <button className="buttonStyle" onClick={submit}>
                  Send IT!
                </button>
              </div>
            </div> :  <div className="connectWalletStyle"> 
                
                {connect()} 
              
              </div>
               }
          </div>
          <div>
            { !Loading && posts.length>0 &&   
              posts.slice(0,limit).map((post, index) => (
               <Body index={index} key={index} post={post} />
              ))}
          </div>
        </div>
        { Loading && 
        <div className="center">
          <img  src={loader} alt={loader} />
          </div>
        }
        <div className="center">
         { limit < posts.length && <button className="loadbuttonStyle" onClick={increase}> Load more !! </button>}
        </div>
      </div>
    );
}