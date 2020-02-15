import React, { Component, useState, useEffect } from "react";
import firebase from 'firebase/app'


function useProject() {
  const [projects, setProjects] = useState([]);
  const firestore = firebase.firestore();
  useEffect(() => {
    firestore.collection("Document").onSnapshot(snapshot => {
      const newProject = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(newProject);
    });
  }, []);
  return projects;
}

const ProjectList = props => {
  const projects = useProject();
  return (
    <div>
      {projects.map(project => (
        <div>
          <input
            type="checkbox"
            onChange={() => props.clickToDelete(project.id)}
          />
          <a key={project.id} href={project.documentLink} data-id={project.id}>
            File
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
