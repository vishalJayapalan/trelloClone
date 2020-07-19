import React, { useState } from 'react'
import { deleteCardFunction, updateCardFunction } from './cardFunctions'
import { getCookie } from '../util/cookies'

export default function CardDetails (props) {
  // console.log(props)
  // const [moveCardPosition, setMoveCardPosition] = useState([])
  // const [moveCardShow, setMoveCardShow] = useState(false)
  // const [inBoard, setInBoard] = useState(
  //   props.boards.filter(board => board._id === props.boardId)
  // )
  // const [inList, setInList] = useState(props.list)

  // function openMoveCard (event) {
  //   const position = event.target.getBoundingClientRect()
  //   setMoveCardPosition(position)
  //   setMoveCardShow(true)
  //   setInBoard(props.boards.filter(board => board._id === props.boardId))
  //   setInList([props.list])
  // }
  // function closeMoveCard (event) {
  //   setMoveCardShow(false)
  // }
  // async function changeInBoard (event) {
  //   await setInBoard(
  //     props.boards.filter(board => board.boardName === event.target.value)
  //   )
  //   await setInList([inBoard[0].lists[0]])
  // }

  // async function changeInList (event) {
  //   await setInList(
  //     inBoard[0].lists.filter(list => list.listName === event.target.value)
  //   )
  // }

  return (
    <div
      className='overlay'
      // style={{ display: props.detailShow ? ' block' : ' none' }}
      onClick={e => {
        if (e.target.className === 'overlay') {
          props.closeCardEditAndDetail()

          // props.exitCardDetails(e)
          // props.closeMoveCard(e)
        }
      }}
    >
      <div className='cardDetailsContainer'>
        <div className='nameCardDetails'>
          <textarea
            className='cardName'
            defaultValue={props.card.cardName}
            spellCheck='false'
            onBlur={e =>
              updateCardFunction(
                props.boardId,
                props.lists,
                'cardName',
                e.target.value,
                props.list._id,
                props.card._id,
                getCookie,
                props.updateListState
              )
            }
          />
          <p>
            in list <b>{props.list.listName}</b>
          </p>
        </div>
        <div className='cardDescription'>
          <label>description</label>
          <textarea
            className='cardDescriptionText'
            placeholder='Add a more detailed Description'
            value={props.card.cardDescription}
            onChange={e =>
              props.updateCard(
                'cardDescription',
                e.target.value,
                props.list._id,
                props.card._id
              )
            }
          />
        </div>
        <i
          className='fas fa-times closeCardDetail'
          onClick={e => props.exitCardDetails(e)}
        />
        <div className='cardSideBar'>
          <div>
            <h3>ADD TO CARD</h3>
            <div>
              <a className='darker'>DueDate</a>
            </div>
          </div>
          <div>
            <h3>ACTIONS</h3>
            <div>
              <a className='darker' onClick={e => props.openMoveCard(e)}>
                Move
              </a>
            </div>
            <div>
              <a className='darker' onClick={e => props.copyCardToggler(e)}>
                Copy
              </a>
            </div>

            <div>
              <a
                className='darker'
                onClick={e => {
                  deleteCardFunction(
                    props.boardId,
                    props.lists,
                    props.list._id,
                    props.card._id,
                    getCookie,
                    props.updateListState
                  )
                  props.exitCardDetails(e)
                }}
              >
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* {moveCardShow && (
        <MoveCard
          moveCardPosition={moveCardPosition}
          cardMoveShow={moveCardShow}
          closeMoveCard={closeMoveCard}
          card={props.card}
          list={props.list}
          boards={props.boards}
          boardName={props.boardName}
          boardId={props.boardId}
          inList={inList}
          changeInList={changeInList}
          inBoard={inBoard}
          changeInBoard={changeInBoard}
          onMoveCard={props.handleMoveCard}
        />
      )} */}
    </div>
  )
}
