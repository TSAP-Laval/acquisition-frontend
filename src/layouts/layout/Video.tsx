import * as React from "react"

export interface ILayoutProps {}
export interface ILayoutState {}

export default class Video extends React.Component<ILayoutProps, ILayoutState> {
  render () {
    return (
        <video autoPlay loop>
            <source src="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov" type="video/mp4"/>
        </video>
    );
  }
}