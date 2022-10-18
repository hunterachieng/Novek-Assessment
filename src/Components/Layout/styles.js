import { css } from "@emotion/css"


export const layout = css`
background-color:#363740
`  



export const sideNav = css `
color:#ffffff;
font-size:"3em";
text-decoration: none
`

export const logoStyle = 
css `
max-width:100%
`
export const  headerText = css`
color:#252733;
font-size:30px
`
export const profileImage = {
    maxWidth:"50%",
    // height:"auto",
    borderRadius:"200px"
}

export const profileImageContainer = {
    maxWidth:"25%",
    height:"auto",
    objectFit:"fill",
    // borderRadius:100
}

export const line={
    borderLeft:"solid 1px #DFE0EB",
    height:"25px"

}

export const headerStyle ={
    display:"flex",
    flexDirection:"row",
    float:"right",
    justifyContent:"space-between",
    // border:"solid 1px black",
}

export const headerInfoStyle = css`
display:flex;
flex-direction:row;
justify-content:space-evenly;
// border:solid 1px black;
width:20%

`