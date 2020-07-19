import React from 'react'
import Card from './card'
import { getCookie } from '../util/cookies'
import {
  createCardFunction,
  deleteCardFunction,
  createCardAtIndexFunction
} from './cardFunctions'
import { dragOverCardFunction, dropCardFunction } from './dragCard'

export default function Cards (props) {
  async function handleDropCard (event, listId) {
    event.persist()
    const boardId = props.boardId
    const prevListId = event.dataTransfer.getData('prevListId')
    const moveCard = JSON.parse(event.dataTransfer.getData('card'))
    await deleteCardFunction(
      boardId,
      props.lists,
      prevListId,
      moveCard._id,
      getCookie,
      props.updateListState
    )
    const { newLists, cardIndex } = dropCardFunction(
      event,
      listId,
      props.lists,
      moveCard
    )
    // setLists(newLists)
    props.updateListState(newLists)
    await createCardAtIndexFunction(
      boardId,
      listId,
      cardIndex,
      moveCard,
      getCookie
    )
  }

  return (
    <div>
      <div
        className='cardsContainer'
        onDragOver={e => dragOverCardFunction(e)}
        onDrop={e => {
          handleDropCard(e, props.list._id)
        }}
      >
        {props.list.cards.map(card => (
          <Card
            displayCardFunction={props.displayCardFunction}
            cardEditFunction={props.cardEditFunction}
            key={card._id}
            listId={props.list._id}
            card={card}
            list={props.list}
          />
        ))}
        <input
          className='newCardInput'
          onKeyUp={e => {
            if (e.target.value && e.keyCode === 13) {
              return createCardFunction(
                e,
                props.boardId,
                props.lists,
                props.list._id,
                getCookie,
                props.updateListState
              )
            }
          }}
          placeholder='+ Add New Card....'
        />
      </div>
    </div>
  )
}
