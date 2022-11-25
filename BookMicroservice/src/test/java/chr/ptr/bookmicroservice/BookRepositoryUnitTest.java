package chr.ptr.bookmicroservice;

import chr.ptr.bookmicroservice.dao.BookDao;
import chr.ptr.bookmicroservice.entities.Book;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.sql.Timestamp;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@TestPropertySource(locations="classpath:application-test.properties")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class BookRepositoryUnitTest {

    @Autowired
    private BookDao repository;

    @Test
    public void testEmptyDb(){
        assertEquals(0, repository.findAll().size());
    }

    @Test
    public void testAddNewBook(){
        Book newBook = new Book();
        newBook.setTitle("Dieci Cento Mille");
        newBook.setAuthor("Peppe Luigi");
        newBook.setPages(345);
        newBook.setPublication_date(new Timestamp(System.currentTimeMillis()));
        repository.save(newBook);
        assertEquals(1, repository.findAll().size());
    }

    @Test
    public void testDeleteBook(){
        List<Book> booksFromDb = repository.findAll();
        assertEquals(1, booksFromDb.size());
        int id = booksFromDb.get(0).getId();
        repository.deleteById(id);
        assertEquals(0,repository.findAll().size());
    }
}
