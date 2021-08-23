import styled from '@emotion/styled'
import graphql from 'babel-plugin-relay/macro'
import React from 'react'
import {createFragmentContainer} from 'react-relay'
import withAtmosphere, {WithAtmosphereProps} from '../decorators/withAtmosphere/withAtmosphere'
import useModal from '../hooks/useModal'
import {InviteTeamMemberAvatar_teamMembers} from '../__generated__/InviteTeamMemberAvatar_teamMembers.graphql'
import {PALETTE} from '~/styles/paletteV3'
import IconLabel from './IconLabel'
import FlatButton from './FlatButton'
import AddTeamMemberModal from './AddTeamMemberModal'

interface Props extends WithAtmosphereProps {
  meetingId?: string
  teamId: string
  teamMembers: InviteTeamMemberAvatar_teamMembers
}

const InviteButton = styled(FlatButton)({
  color: PALETTE.SKY_500,
  fontWeight: 600,
  lineHeight: 1,
  padding: '0 8px',
  ':hover, :focus, :active': {
    color: PALETTE.SKY_600
  }
})

const Label = styled('div')({
  fontSize: 12,
  fontWeight: 600,
  color: PALETTE.SLATE_700
})

const InviteTeamMemberAvatar = (props: Props) => {
  const {meetingId, teamId, teamMembers} = props
  const {togglePortal: toggleModal, closePortal: closeModal, modalPortal} = useModal()
  return (
    <>
      <InviteButton onClick={toggleModal}>
        <IconLabel icon='person_add' iconLarge label={<Label>Invite</Label>} labelBelow />
      </InviteButton>
      {modalPortal(
        <AddTeamMemberModal
          closePortal={closeModal}
          meetingId={meetingId}
          teamId={teamId}
          teamMembers={teamMembers}
        />
      )}
    </>
  )
}

export default createFragmentContainer(withAtmosphere(InviteTeamMemberAvatar), {
  teamMembers: graphql`
    fragment InviteTeamMemberAvatar_teamMembers on TeamMember @relay(plural: true) {
      ...AddTeamMemberModal_teamMembers
    }
  `
})
