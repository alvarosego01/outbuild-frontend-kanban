

import React, { FC } from 'react'
import { ConnectedUser_I } from '../../../../../core/interfaces'

interface Props_I {
    users: ConnectedUser_I[]
}

export const CursorInteraction: FC<Props_I> = ({
    users = []
}) => {

    const set_pos = (coord?: number) => {

        if (coord) {
            return coord;
        } else {
            return 0;
        }

    }

    const arrow = () => {
        return
    }

    return (
        <>

            {
                users.length > 0 && users.map((user: ConnectedUser_I) => {
                    return (
                        <div key={user.id} className="absolute z-10 flex flex-col" style={{ top: set_pos(user.position?.y), left: set_pos(user.position?.x) }}>

                            <i className='text-4xl text-indigo-400 -rotate-45 bx bxs-up-arrow'></i>
                            <span className="relative flex self-center p-1 px-2 text-sm text-white bg-indigo-400 rounded-full name left-8 top-1">
                                {user.username}
                            </span>

                        </div>
                    )
                })
            }
        </>
    )
}
