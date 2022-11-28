package chr.ptr.bookmicroservice;

import chr.ptr.bookmicroservice.dao.BookDao;
import chr.ptr.bookmicroservice.entities.Book;
import chr.ptr.bookmicroservice.services.IBookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.sql.Date;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@TestPropertySource(locations="classpath:application-test.properties")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class BookControllerUnitTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private IBookService service;

    @Test
    public void testGetAll() throws Exception{
        try{
            mockMvc.perform(MockMvcRequestBuilders
                            .get("/api/books")
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Test
    public void saveNew() throws Exception{
        try{
            Book newbook = new Book();
            newbook.setTitle("Canta balla");
            newbook.setAuthor("Roberto Fauso");
            newbook.setPages(202);
            newbook.setPublication_date(new Date(System.currentTimeMillis()));
            mockMvc.perform(MockMvcRequestBuilders
                            .post("/api/books")
                            .content(objectMapper.writeValueAsString(newbook))
                            .contentType(MediaType.APPLICATION_JSON)
                            .accept(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
