import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Avatar,
    Divider,
} from '@mui/material';

const RepositoryCard = ({ repo }) => {
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

    const toggleDescription = () => {
        setDescriptionExpanded(!isDescriptionExpanded);
    };

    return (
        <Card key={repo.id} sx={{ boxShadow: "0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);", border: "3px solid teal" }}>
            <CardHeader
                avatar={<Avatar src={repo.owner.avatar_url} />}
                title={repo.name}
                subheader={`Stars: ${repo.stargazers_count}`}
            />
            <Divider />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <b>Description:</b> {isDescriptionExpanded ? repo.description : repo.description?.slice(0, 200)}
                    {repo.description && repo.description.length > 200 && (
                        <span onClick={toggleDescription} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>
                            {isDescriptionExpanded ? 'Read Less' : '...Read More'}
                        </span>
                    )}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <b>Language:</b>  {repo.language}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default RepositoryCard;
