async function createCardFunction (
  event,
  boardId,
  lists,
  listId,
  getCookie,
  updateListState
) {
  //   const boardId = props.match.params.boardId
  const cardName = event.target.value
  event.target.value = ''
  const data = await window.fetch(
    `http://localhost:8000/board/card/${boardId}/${listId}`,
    {
      method: 'POST',
      body: JSON.stringify({ cardName: cardName, description: '' }),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    }
  )
  const jsonData = await data.json()
  const newLists = lists.map(list => {
    if (list._id === listId) {
      list.cards.push({ cardName, _id: jsonData.cardId })
    }
    return list
  })
  updateListState(newLists)
  //   setLists(newLists)
}

async function deleteCardFunction (
  boardId,
  lists,
  listId,
  cardId,
  getCookie,
  updateListState
) {
  await window.fetch(
    `http://localhost:8000/board/card/${boardId}/${listId}/${cardId}`,
    {
      method: 'DELETE',
      headers: {
        'x-auth-token': getCookie('x-auth-token')
      }
    }
  )
  const newLists = lists.map(list => {
    if (list._id === listId) {
      list.cards = list.cards.filter(card => card._id !== cardId)
    }
    return list
  })
  updateListState(newLists)

  return newLists
  // setLists(newLists)
}

async function updateCardFunction (
  boardId,
  lists,
  name,
  cardName,
  listId,
  cardId,
  getCookie,
  updateListState
) {
  // const boardId = props.match.params.boardId
  const newLists = lists.map(list => {
    if (list._id === listId) {
      const newCards = list.cards.map(card => {
        if (card._id === cardId) {
          card[`${name}`] = cardName
        }
        return card
      })
      list.cards = newCards
    }

    return list
  })
  updateListState(newLists)
  //   setLists(newLists)
  await window.fetch(
    `http://localhost:8000/board/card/${boardId}/${listId}/${cardId}`,
    {
      method: 'PUT',
      body: JSON.stringify({ name: name, value: cardName }),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    }
  )
}

async function createCardAtIndexFunction (
  boardId,
  listId,
  cardIndex,
  moveCard,
  getCookie
) {
  console.log('inFunc', moveCard)
  await window.fetch(
    `http://localhost:8000/board/card/${boardId}/${listId}/${cardIndex}`,
    {
      method: 'POST',
      body: JSON.stringify(moveCard),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    }
  )
}

export {
  deleteCardFunction,
  updateCardFunction,
  createCardFunction,
  createCardAtIndexFunction
}
