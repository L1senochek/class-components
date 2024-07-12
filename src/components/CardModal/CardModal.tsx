import React, { useEffect, useState } from 'react';
import styles from './card-modal.module.css';
import { useNavigate, useParams } from 'react-router';

interface IUserDetails {
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

const CardModal: React.FC = (): JSX.Element | null => {
  const { userId } = useParams<{ userId: string }>();
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect((): void => {
    if (
      window.location.href.includes(`http://localhost:5173/main/user/${userId}`)
    ) {
      setIsOpen(true);
      setIsLoading(true);
    }
    (async (): Promise<void> => {
      try {
        const response = await fetch(`https://api.github.com/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const userData = await response.json();
        setUserDetails(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  const handleClose = (): void => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    const savedPage = localStorage.getItem('currentPage') || '1';
    const savedLimit = localStorage.getItem('limit') || '10';

    navigate(
      `/main?page=${savedPage}&limit=${savedLimit}&query=${savedSearchTerm}`
    );

    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.userdetails} ${isOpen ? '' : styles.hidden}`}>
      <button className={styles.closebtn} onClick={handleClose}>
        Close
      </button>
      {!userDetails ? (
        <div>User details not found</div>
      ) : isLoading ? (
        <div>Loading details...</div>
      ) : (
        <>
          <h2>{userDetails.login}</h2>
          <img
            className={styles.avatar}
            src={userDetails.avatar_url}
            alt={userDetails.login}
          />
          <p>Followers: {userDetails.followers}</p>
          <p>Following: {userDetails.following}</p>
          <p>Public Repos: {userDetails.public_repos}</p>
          <a
            href={userDetails.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </>
      )}
    </div>
  );
};

export default CardModal;
