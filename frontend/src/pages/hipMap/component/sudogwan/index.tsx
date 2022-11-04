import { FullMapWrappingDiv, SudogwanMapDiv, GridDivRegional, NotDotSpanRegional, ArrowDiv } from "../../styles/fullmap";
import { SudogwanSpanRegional } from "../../styles/fullmap";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from "react-redux";
import { saveClick, saveSudogwan, saveSudogwanMobile, saveName, saveSudogwanAnime } from "../../../../store/hipMap/hipMapStore";
import { useNavigate } from "react-router-dom";

function Sudogwan(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const mapDot = [
        [-1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1],
        [-1, -1, -1, -1, 0, 0, 0, 0, 0, -1, -1, -1, -1],
        [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1],
        [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0,  0, -1, -1],
        [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  -1],
        [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, -1],
        [0, 0, 0, 0, 0, 0, 0, -1, 0, 0, -1, -1, -1],
        [0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
       ]

    function SudogwanSelect(){
      dispatch(saveClick())
      dispatch(saveSudogwan())
      dispatch(saveSudogwanAnime())
      dispatch(saveSudogwanMobile({
        isSudogwanMobile: false
      }))
      dispatch(saveName(
        {
          name: ""
        }))
    }
    function SudogwanClick(){
      navigate('/hipmap/result')
    }
        return (
          <FullMapWrappingDiv>
            <ArrowDiv onClick={() => SudogwanSelect()} >
              <ArrowBackIcon fontSize="large"/>
            </ArrowDiv>
            <SudogwanMapDiv>
              {mapDot.map((dots, i) => (
              <GridDivRegional>
                {dots.map((dot, j) =>{
                    if(i === 1){
                        if(dot !== -1){
                            if(j === 4 || j === 5){
                              return(
                                <SudogwanSpanRegional onClick={() => SudogwanClick()}>
                                  {dot}
                                </SudogwanSpanRegional>
                              )
                            }
                            else{
                                return(
                                <NotDotSpanRegional>
                                </NotDotSpanRegional>
                                )
                            }
                      }
                      else{
                        return(
                          <NotDotSpanRegional>
                          </NotDotSpanRegional>
                        )
                      }
                    }
                    else if(i === 2){
                        if(dot !== -1){
                            if(j === 3 || j === 4 || j === 5){
                              return(
                                <SudogwanSpanRegional onClick={() => SudogwanClick()}>
                                  {dot}
                                </SudogwanSpanRegional>
                              )
                            }
                            else{
                                return(
                                <NotDotSpanRegional>
                                </NotDotSpanRegional>
                                )
                            }
                        }
                        else{
                            return(
                            <NotDotSpanRegional>
                            </NotDotSpanRegional>
                            )
                        }
                    }
                    else if(i === 3){
                        if(dot !== -1){
                            if(j === 1 || j === 2 || j === 3 || j === 4 || j === 5 || j === 6){
                              return(
                                <SudogwanSpanRegional onClick={() => SudogwanClick()}>
                                  {dot}
                                </SudogwanSpanRegional>
                              )
                            }
                            else{
                                return(
                                <NotDotSpanRegional>
                                </NotDotSpanRegional>
                                )
                            }
                        }
                        else{
                            return(
                            <NotDotSpanRegional>
                            </NotDotSpanRegional>
                            )
                        }
                    }
                    else if(i === 4){
                        if(dot !== -1){
                            if(j === 2 || j === 3 || j === 4 || j === 5 || j === 6){
                              return(
                                <SudogwanSpanRegional onClick={() => SudogwanClick()}>
                                  {dot}
                                </SudogwanSpanRegional>
                              )
                            }
                            else{
                                return(
                                <NotDotSpanRegional>
                                </NotDotSpanRegional>
                                )
                            }
                        }
                        else{
                            return(
                            <NotDotSpanRegional>
                            </NotDotSpanRegional>
                            )
                        }
                    }
                    else if(i === 5){
                        if(dot !== -1){
                            if(j === 3 || j === 4 || j === 5){
                              return(
                                <SudogwanSpanRegional onClick={() => SudogwanClick()}>
                                  {dot}
                                </SudogwanSpanRegional>
                              )
                            }
                            else{
                                return(
                                <NotDotSpanRegional>
                                </NotDotSpanRegional>
                                )
                            }
                        }
                        else{
                            return(
                            <NotDotSpanRegional>
                            </NotDotSpanRegional>
                            )
                        }
                  }
                  else{
                    return(
                        <div></div>
                    )
                  }
            
                })}
                </GridDivRegional>
              ))}
            </SudogwanMapDiv>
          </FullMapWrappingDiv>
        );
      };

export default Sudogwan