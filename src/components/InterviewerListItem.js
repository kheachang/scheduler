import React from "react"
import classNames from 'classnames';
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  const interviewerClass = classNames(
    'interviewers__item', {
      'interviewers__item-image': props.avatar,
      'interviewers__item--selected': props.selected,
    }
  )
  return (<li className={interviewerClass} onClick = {() => {props.setInterviewer(props.name)}}>
  <img
    className={interviewerClass}
    src="https://i.imgur.com/LpaY82x.png"
    alt="Sylvia Palmer"
  />
  Sylvia Palmer
</li>
)
}
// Our InterviewerListItem component takes in the following props:

// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection
