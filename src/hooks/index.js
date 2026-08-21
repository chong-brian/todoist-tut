/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import moment from 'moment';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import { collatedTasksExist } from '../helpers';

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    const constraints = [where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')];

    if (selectedProject && !collatedTasksExist(selectedProject)) {
      constraints.push(where('projectId', '==', selectedProject));
    } else if (selectedProject === 'TODAY') {
      constraints.push(where('date', '==', moment().format('DD/MM/YYYY')));
    } else if (selectedProject === 'INBOX' || selectedProject === 0) {
      constraints.push(where('date', '==', ''));
    }

    const q = query(collection(db, 'tasks'), ...constraints);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
              (task) =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'projects'),
      where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw'),
      orderBy('projectId')
    );

    getDocs(q).then((snapshot) => {
      const allProjects = snapshot.docs.map((project) => ({
        ...project.data(),
        docId: project.id,
      }));

      if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
        setProjects(allProjects);
      }
    });
  }, [projects]);

  return { projects, setProjects };
};
