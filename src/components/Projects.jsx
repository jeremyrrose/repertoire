import React from 'react';
import Project from './Project';
import '../styles/Project.css';

export const Projects = (props) => {

    if (props.projects) {
        const projects = props.projects;
        const projectArray = projects.map((project, i) => <Project key={i} index={i} data={project} id={props.userId} select={() => {props.select(i)}} /> );
        return (
            <div className="projects">
                <h4>projects</h4>
                {projectArray}
            </div>
        )
        
    } else {

        return null;

    }

}