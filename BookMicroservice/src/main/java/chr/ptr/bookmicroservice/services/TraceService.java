package chr.ptr.bookmicroservice.services;

import brave.Span;
import brave.Tracer;
import org.springframework.stereotype.Service;

@Service
public class TraceService implements ITraceService{

    Tracer tracer;

    public TraceService(Tracer tracer) {
        this.tracer = tracer;
    }

    @Override
    public String getTraceId() {
        Span span = tracer.currentSpan();
        return span.context().traceIdString();
    }
}
