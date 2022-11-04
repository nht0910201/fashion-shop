import { Box } from '@mui/material';
import { Row, Col, Container, Text, Link, Loading } from '@nextui-org/react';

export default function Categories({ categories }) {
    return (
        <Container responsive={false} css={{ width: '100vw' }}>
            <Row justify="space-between">
                {categories.length === 0 ? (
                    <Box sx={{ width: '100vw', height: 100 }}>
                        <Loading
                            css={{ justifyContent: 'center', display: 'flex', marginTop:30 }}
                            color={'warning'}
                            type={'gradient'}
                        />
                    </Box>
                ) : (
                    categories.map((category) => (
                        <Col>
                            <Link href={`/productList/${category.id}`}>
                                <Text
                                    weight={'semibold'}
                                    css={{
                                        '&:hover': { textDecoration: 'underline', color: '$warning' },
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {category.name}
                                </Text>
                            </Link>
                            {category.subCategories.map((sub) => (
                                <Link href={`/productList/${sub.id}`}>
                                    <Text css={{ '&:hover': { color: '$warning' } }}>{sub.name}</Text>
                                </Link>
                            ))}
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}
