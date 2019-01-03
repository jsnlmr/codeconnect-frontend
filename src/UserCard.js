import React, {Component} from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react'

class UserCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      liked: this.props.isLiked(this.props.profile)
    }
  }


  // const isLiked = () => this.props.current.user_likees.find(likee =>
  //   likee.id === props.profile.id)

  likeUser = () => {
    fetch(`http://localhost:3001/api/v1/users/${this.props.current.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepted': 'application/json'
      },
      body: JSON.stringify(this.props.profile)
    }).then(this.setState({liked: !this.state.liked}))
  }

  unlikeUser = () => {
    // let userToLike = {
    //   id: props.profile.id,
    //   username: props.profile.username,
    //   zip_code: props.profile.zip_code,
    //   bio: props.profile.bio
    // }

    // let likees = {user_likees: [...props.current.user_likees, userToLike]}

    fetch(`http://localhost:3001/api/v1/users/${this.props.current.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepted': 'application/json'
      },
      body: JSON.stringify(this.props.profile)
    }).then(this.setState({liked: !this.state.liked}))
  }
  render() {
    return (
      <div>
        <Card onClick={() => this.props.clickHandler(this.props.profile)}>
          <Card.Content>
            <Card.Header>{this.props.profile.username}</Card.Header>
            <Card.Meta>{this.props.profile.skills.map(skill =>
              skill.language).join(' | ')}
            </Card.Meta>
            <Card.Description>{`${this.props.profile.bio.slice(0, 140)}...`}</Card.Description>
          </Card.Content>
        </Card>
        { this.state.liked ? <Button color='red' onClick={this.unlikeUser}>Remove Like</Button> : <Button color='green' onClick={this.likeUser} >Like</Button> }
      </div>
    )
  }
}


export default UserCard