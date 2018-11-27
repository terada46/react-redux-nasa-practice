import React from 'react';
import { isImage, isYoutuVideo } from '../../functions';

const Video = (props) => <iframe 
		width="560" 
		height="315" 
		src={props.url} 
		frameBorder="0" 
		allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
	</iframe>;

const AstronomyCard = (props) => {

	const { title, url, hdurl, explanation, date, copyright } = props.data;

	return (
		<div className="astronomy-card">
			<h6 className="astronomy-title">{title}</h6>
			<a href={hdurl} className="astronomy-image-wrapper">
				{isImage(url) ? <img src={url} alt={title} /> : isYoutuVideo(url) ? <Video url={url} /> : null}
			</a>
			<p>{explanation}</p>
			<span>{date}, {copyright}</span>
		</div>
	)
}

export default AstronomyCard;