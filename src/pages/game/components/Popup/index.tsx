import { Close } from "@mui/icons-material";
import { IconContainer } from "../../../../components/IconContainer";
import usePopup from "./store";

export default () => {
  const popup = usePopup();
  return (
    <>
      <div className="flex flex-col justify-between">
          <div className="mb-4 flex">
              <p>You have other game running, keep the new game? </p>
              <div onClick={() => popup.setShow(false)}>
                  <IconContainer>
                      <Close/>
                  </IconContainer>
              </div>
          </div>
          <button onClick={() => popup.setSelection("resume")} className="custom-button-alert py-2 rounded-lg custom-text-1 mb-2">Resume</button>
          <button onClick={() => popup.setSelection("new")} className="custom-button py-2 rounded-lg custom-text-1">New Game</button>
      </div>
    </>
  )
}