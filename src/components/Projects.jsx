import React from 'react';
import Project from './Project';

export const Projects = (props) => {

    if (props.projects) {
        const projects = props.projects;
        const projectArray = projects.map((project, i) => <Project key={i} data={project} /> );
        
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