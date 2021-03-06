import React, { useState } from 'react'
// import { addTeamMemberFunction } from '../users/userFunctions'
import { getCookie } from '../util/cookies'

async function addTeamMemberFunction (
  event,
  boardId,
  getCookie,
  updateBoardState
) {
  const teamMemberId = event.target.id
  const data = await window.fetch(`http://localhost:8000/team/${boardId}`, {
    method: 'POST',
    body: JSON.stringify({ teamMemberId: teamMemberId }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getCookie('x-auth-token')
    }
  })

  const jsonData = await data.json()
  updateBoardState('team', jsonData.team)
  //   setBoard(jsonData)
}

export default function InviteToBoard (props) {
  const [search, setSearch] = useState('')
  let searchUsers = []
  if (search) {
    searchUsers = props.users.filter(
      user =>
        (user.userName.includes(search.toLowerCase()) ||
          user.userName.includes(search.toUpperCase())) &&
        !props.team.includes(user._id)
    )
  }

  return (
    <div
      className='inviteToBoardContainer'
      style={{
        marginTop: `${props.usersPosition.y + 30}px`,
        marginLeft: `${props.usersPosition.x}px`
      }}
    >
      <div className='inviteToBoardTitleContainer'>
        <span>Invite To Board</span>
        <i
          className='fas fa-times closeInviteToBoard'
          onClick={() => props.closeInviteToBoard()}
        />
      </div>
      <hr />
      <div>
        <input
          className='inviteToBoardInput'
          onChange={e => setSearch(e.target.value)}
          placeholder='userName'
        />
        <div>
          {searchUsers.map(user => (
            <p
              key={user._id}
              id={user._id}
              onClick={e => {
                addTeamMemberFunction(
                  e,
                  props.board._id,
                  getCookie,
                  props.updateBoardState
                )
              }}
            >
              {user.userName}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
