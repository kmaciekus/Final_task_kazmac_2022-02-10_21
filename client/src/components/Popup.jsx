import React from 'react'
import { Button } from "../ui/Button/Button"
import { PopupInner, PopupWrapper } from "../ui/Popup/Popup"

export const Popup = (props) => {
  return (props.trigger) ? (
	<PopupWrapper>
		<PopupInner>
			<Button className="btn-popup-close" onClick={() => props.setTrigger(false)} >X</Button>
			{props.children}
		</PopupInner>
	</PopupWrapper>
  ) : "";
}
