import { Row, Col, Container, Text, Link } from "@nextui-org/react"

export default function Categories({ categories }) {
    return (
        <Container responsive={false} css={{width:'100vw'}}>
            <Row justify="space-between">
                {categories.map((category) => (
                    <Col>
                        <Link href={`/productList/${category.id}`}>
                            <Text 
                                css={{"&:hover":{textDecoration: 'underline', color:'$warning'}}} b >
                                {category.name}
                            </Text>
                        </Link>
                        
                        {category.subCategories.map((sub) => (
                            <Link href={`/productList/${sub.id}`}>
                                <Text 
                                    css={{"&:hover":{textDecoration: 'underline', color:'$warning'}}}>
                                    {sub.name}
                                </Text>
                            </Link>
                            
                        ))}
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
